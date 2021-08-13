# Sample Hydra Project

This is a sample project generated by `hydra-cli scaffold`. Experiment by modifying `schema.graphql` and the mappings in the `mappings` folder.

## Prerequisites

* Node v14x
* Docker

## Bootstrap

```bash
npm ci

# Analyze schema.graphql and generate model/server files
yarn codegen

# Create custom types from manifest.yml
yarn typegen

# Start postgres instance
docker-compose up

# Create target database
yarn db:create

# Analyze database state and create migration to match generated models
# npm run db:create-migration # This step is already done here

# If necessary
yarn db:create-migration

# Apply pending migrations
yarn db:migrate


# Apply migrations related to processor's state keeping tables
yarn processor:migrate

# Now you can start processing chain data
yarn processor:start

# The above command will block
# Open separate terminal and launch graphql server to query the processed data
yarn query-node:start
```

## Configuration

Project's configuration is driven by environment variables, defined in `.env`,
and `manifest.yml`.
