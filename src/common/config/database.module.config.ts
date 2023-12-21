import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],

})
export class DatabaseModule {}