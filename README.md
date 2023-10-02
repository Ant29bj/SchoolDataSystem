## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Datos acerca

    El pago de los alumnos debera ser como minimo 590 y aumentara de 80 en 80 hasta 990

## Adicionales

    ```
        reporte de datos del alumno(kardex)
        reporte del grupo(promedio general)
        reporte de pagos de nomina(maestros)

        -- Agregar sistema de permisos
            tabla de usuarios

    ```

## To Do

```
    agregar tabla de usuarios

    agregar tabla de nommina(receptor, cantidad y fecha)

    agregar tabla registrar tabla

    parents entity
        // falta relacionar con estudiantes

    teachers entity
        // falta relacionar con direccion
        // Relacion OneToMany con grupos

    groups entity
        // relacionar teacher
        // rleacionar studnets

    students entity
        // definir formato de la matricula
        // realacionar direccion
        // crear enumerados faltantes de la tabla
        // one to many parents
```

## Set up

```
En app.module.ts se configura la base de datos a la que se conectara
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'root',
      password: 'root',
      database: 'root',
      host: 'localhost',
      port: 5432,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
