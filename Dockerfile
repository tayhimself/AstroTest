FROM node:18.19.1-alpine AS runtime
WORKDIR /app

ENV HOST=0.0.0.0

# run this in dev to create the astro build and then copy the dist folder to the runtime
# must run the build in dev with the correct env variables either by running in docker or with an env file
# RUN npm install && RUN npm run build

# we can't run the node server right away because we need to run the astro build first if it wasn't built on dev. Don't want to build it in the runtime image instructions because it uses up all the space and the VM has no disk space.
# So the tail command is used to keep the container running until the astro build is mounted in the compose file using volumes.
# CMD node ./dist/server/entry.mjs
CMD ["tail", "-f", "/dev/null"]