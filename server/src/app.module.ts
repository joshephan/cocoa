import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeModule } from './exchange/exchange.module';
import { PriceModule } from './price/price.module';
import { NewsModule } from './news/news.module';
import { CollectorModule } from './collector/collector.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ExchangeModule,
    PriceModule,
    NewsModule,
    CollectorModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
