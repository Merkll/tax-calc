RUN nvm use
RUN yarn 
RUN yarn start:db
RUN yarn db:migrate
RUN yarn start
