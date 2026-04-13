import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    TasksModule,
    UsersModule, 
  ],
})
export class AppModule {}
