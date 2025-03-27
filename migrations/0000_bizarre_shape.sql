CREATE TABLE "game_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"score" integer NOT NULL,
	"traveler_type" text NOT NULL,
	"choices" json NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "game_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_plays" integer DEFAULT 0 NOT NULL,
	"scenario_id" integer NOT NULL,
	"choice_id" text NOT NULL,
	"choice_count" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "game_scores" ADD CONSTRAINT "game_scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;