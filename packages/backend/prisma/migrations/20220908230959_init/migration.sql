-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "surname" VARCHAR(30),
    "email" VARCHAR(30),
    "eventdate" DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
