migrate((db) => {
  const collection = new Collection({
    "id": "m2raj4l5fa6m0gp",
    "created": "2023-03-17 22:29:09.466Z",
    "updated": "2023-03-17 22:29:09.466Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "isxxpipx",
        "name": "test",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp");

  return dao.deleteCollection(collection);
})
