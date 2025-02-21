import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DrizzleClient } from '../database/database.module';
import {
  users,
  User,
  NewUser,
  FORBIDDEN_USERNAMES,
} from '../database/schema/user';
import { predicts } from '../database/schema/predict';
import { eq } from 'drizzle-orm';

export interface UserWithPredict extends User {
  predict: typeof predicts.$inferSelect | null;
}

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE') private readonly db: typeof DrizzleClient) {}

  async findBySocialId(socialId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.socialId, socialId));
    return user;
  }

  async create(data: NewUser): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return user;
  }

  async findById(id: number): Promise<UserWithPredict | undefined> {
    const [result] = await this.db
      .select({
        id: users.id,
        socialId: users.socialId,
        email: users.email,
        name: users.name,
        phoneNumber: users.phoneNumber,
        bio: users.bio,
        telegram: users.telegram,
        youtube: users.youtube,
        instagram: users.instagram,
        twitter: users.twitter,
        discord: users.discord,
        homepage: users.homepage,
        github: users.github,
        provider: users.provider,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        predict: predicts,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .leftJoin(predicts, eq(users.id, predicts.userId));

    return result;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async update(
    id: number,
    data: Partial<Omit<NewUser, 'id' | 'socialId'>>,
  ): Promise<User> {
    const [user] = await this.db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async findAll(): Promise<User[]> {
    return this.db.select().from(users);
  }

  async getPublicProfile(userId: number): Promise<Partial<UserWithPredict>> {
    const [result] = await this.db
      .select({
        id: users.id,
        name: users.name,
        bio: users.bio,
        createdAt: users.createdAt,
        telegram: users.telegram,
        youtube: users.youtube,
        instagram: users.instagram,
        twitter: users.twitter,
        discord: users.discord,
        homepage: users.homepage,
        github: users.github,
        predict: {
          userId: predicts.userId,
          wins: predicts.wins,
          losses: predicts.losses,
          draws: predicts.draws,
          longCount: predicts.longCount,
          shortCount: predicts.shortCount,
          maxWinStreak: predicts.maxWinStreak,
          maxLoseStreak: predicts.maxLoseStreak,
          currentWinStreak: predicts.currentWinStreak,
          currentLoseStreak: predicts.currentLoseStreak,
          vault: predicts.vault,
          lastPredictAt: predicts.lastPredictAt,
          lastCheckInAt: predicts.lastCheckInAt,
        },
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .leftJoin(predicts, eq(users.id, predicts.userId));

    if (!result) {
      throw new NotFoundException('User not found');
    }

    if (!result.predict) {
      return {
        ...result,
        predict: null,
      };
    }

    return result;
  }

  validateUsername(name: string): boolean {
    // 금지된 닉네임 체크
    if (FORBIDDEN_USERNAMES.includes(name)) {
      return false;
    }

    // 최소 2자, 최대 20자
    if (name.length < 2 || name.length > 20) {
      return false;
    }

    // 특수문자 제한 (언더스코어와 점만 허용)
    const regex = /^[a-zA-Z0-9가-힣._]+$/;
    return regex.test(name);
  }

  async updateProfile(userId: number, data: { name?: string; bio?: string }) {
    if (data.name && !this.validateUsername(data.name)) {
      throw new BadRequestException('Invalid username');
    }

    const [updatedUser] = await this.db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }
}
