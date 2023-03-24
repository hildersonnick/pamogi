migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  // remove
  collection.schema.removeField("hdpluxbx")

  // remove
  collection.schema.removeField("39wzfeuw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qolvgen",
    "name": "dates",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p9dbhm2n",
    "name": "departments",
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
    "id": "hdpluxbx",
    "name": "dates",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "39wzfeuw",
    "name": "departments",
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
  collection.schema.removeField("5qolvgen")

  // remove
  collection.schema.removeField("p9dbhm2n")

  return dao.saveCollection(collection)
})
