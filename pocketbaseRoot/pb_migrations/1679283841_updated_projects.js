migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  // remove
  collection.schema.removeField("1abs9pvm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igadvles",
    "name": "tags",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1abs9pvm",
    "name": "tags",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("igadvles")

  return dao.saveCollection(collection)
})
