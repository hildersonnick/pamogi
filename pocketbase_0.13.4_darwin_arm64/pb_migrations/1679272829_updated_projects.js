migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xy0t8l6p",
    "name": "email",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  // remove
  collection.schema.removeField("xy0t8l6p")

  return dao.saveCollection(collection)
})
