migrate((db) => {
  const collection = new Collection({
    "id": "4olg1fpf8rawbqq",
    "created": "2023-03-20 00:37:18.321Z",
    "updated": "2023-03-20 00:37:18.321Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cit9vyc4",
        "name": "email",
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
  const collection = dao.findCollectionByNameOrId("4olg1fpf8rawbqq");

  return dao.deleteCollection(collection);
})
