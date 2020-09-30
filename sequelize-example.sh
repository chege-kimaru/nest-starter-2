export DB_NAME=
export DB_USER=
export DB_PASSWORD=
export DB_HOST=
export DB_PORT=
export DB_DIALECT=

if [ $1 == 'seed' ]
then
    sequelize db:seed:all
elif [ $1 == 'migrate' ]
then
    sequelize db:migrate
elif [ $1 == 'rollback' ]
then 
    sequelize db:migrate:undo
# else
#     sequelize db:migrate
fi