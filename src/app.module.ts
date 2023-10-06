import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentsModule } from './app/parents/parents.module';
import { DirectionsModule } from './app/directions/directions.module';
import { TeachersModule } from './app/teachers/teachers.module';
import { GroupsModule } from './app/groups/groups.module';
import { StudentsModule } from './app/students/students.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      database: 'root',
      host: 'localhost',
      port: 5432,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ParentsModule, DirectionsModule, GroupsModule, StudentsModule, TeachersModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
