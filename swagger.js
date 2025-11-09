const swaggerUi = require("swagger-ui-express");

const doc = {
  info: {
    title: "MLB Data API",
    description: "CSE341 | Major League Baseball Data API",
    version: "1.0.0",
  },
  host: process.env.HOST || "localhost:3000",
  schemes: ["http"],
  tags: [
    {
      name: "teams",
      description: "Team management operations",
    },
    {
      name: "cy-young-winners",
      description: "Cy Young Award winner operations",
    },
  ],
  paths: {
    "/teams": {
      get: {
        tags: ["teams"],
        summary: "Get all teams",
        description: "Retrieve a list of all MLB teams",
        responses: {
          200: {
            description: "A list of teams",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["teams"],
        summary: "Create a new team",
        description: "Add a new MLB team to the database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  city: { type: "string" },
                  league: { type: "string" },
                  division: { type: "string" },
                  stadium: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Team created successfully",
          },
        },
      },
    },
    "/teams/{id}": {
      get: {
        tags: ["teams"],
        summary: "Get a team by ID",
        description: "Retrieve a single team by its ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Team ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "A team object",
          },
        },
      },
      put: {
        tags: ["teams"],
        summary: "Update a team",
        description: "Update an existing team's information",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Team ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        responses: {
          204: {
            description: "Team updated successfully",
          },
        },
      },
      delete: {
        tags: ["teams"],
        summary: "Delete a team",
        description: "Remove a team from the database",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Team ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Team deleted successfully",
          },
        },
      },
    },
    "/cy-young-winners": {
      get: {
        tags: ["cy-young-winners"],
        summary: "Get all Cy Young winners",
        description: "Retrieve a list of all Cy Young Award winners",
        responses: {
          200: {
            description: "A list of Cy Young winners",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["cy-young-winners"],
        summary: "Create a new Cy Young winner",
        description: "Add a new Cy Young Award winner to the database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  player: { type: "string" },
                  team: { type: "string" },
                  year: { type: "number" },
                  league: { type: "string" },
                  era: { type: "number" },
                  wins: { type: "number" },
                  strikeouts: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Cy Young winner created successfully",
          },
        },
      },
    },
    "/cy-young-winners/{id}": {
      get: {
        tags: ["cy-young-winners"],
        summary: "Get a Cy Young winner by ID",
        description: "Retrieve a single Cy Young winner by their ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Cy Young winner ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "A Cy Young winner object",
          },
        },
      },
      put: {
        tags: ["cy-young-winners"],
        summary: "Update a Cy Young winner",
        description: "Update an existing Cy Young winner's information",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Cy Young winner ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        responses: {
          204: {
            description: "Cy Young winner updated successfully",
          },
        },
      },
      delete: {
        tags: ["cy-young-winners"],
        summary: "Delete a Cy Young winner",
        description: "Remove a Cy Young winner from the database",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "Cy Young winner ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Cy Young winner deleted successfully",
          },
        },
      },
    },
  },
};

module.exports = { swaggerUi, doc };
