ALTER TABLE "guestbooks" ADD COLUMN "target_user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "guestbooks" ADD CONSTRAINT "guestbooks_target_user_id_users_id_fk" FOREIGN KEY ("target_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;