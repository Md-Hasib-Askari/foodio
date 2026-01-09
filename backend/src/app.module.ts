import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        Logger.log('Connecting to the database...', 'TypeOrmModule');
        Logger.log(`Host: ${configService.get<string>('POSTGRES_HOST', 'localhost')}`, 'TypeOrmModule');
        Logger.log(`Port: ${configService.get<number>('POSTGRES_PORT', 5432)}`, 'TypeOrmModule');
        Logger.log(`Database: ${configService.get<string>('POSTGRES_DATABASE')}`, 'TypeOrmModule');
        Logger.log(`Username: ${configService.get<string>('POSTGRES_USERNAME')}`, 'TypeOrmModule');
        Logger.log(`Password: ********`, 'TypeOrmModule');
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST', 'localhost'),
          port: configService.get<number>('POSTGRES_PORT', 5432),
          username: configService.get<string>('POSTGRES_USERNAME'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          synchronize: false,
        }
      }
    }), AuthModule, UsersModule, CategoriesModule, MenuItemsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
