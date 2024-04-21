import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './services/usuarios.services';
import { UsuariosController } from './controllers/usuarios.controller';

@Module({
    controllers: [AuthController, UsuariosController],
    providers: [AuthService, UsuariosService],
    imports: [TypeOrmModule.forFeature([Usuario])],
    exports: []
})
export class AuthModule{

}