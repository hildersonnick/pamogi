migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2raj4l5fa6m0gp")

  collection.name = "projects"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nanbwl0u",
    "name": "what",
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
    "id": "wuoyue8g",
    "name": "why",
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
    "id": "4chfz9fv",
    "name": "how",
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
    "id": "pa8ror1p",
    "name": "goals",
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
    "id": "1abs9pvm",
    "name": "budget",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyrvbdmw",
    "name": "tasks",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "isxxpipx",
    "name": "projectName",
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

  collection.name = "test"

  // remove
  collection.schema.removeField("nanbwl0u")

  // remove
  collection.schema.removeField("wuoyue8g")

  // remove
  collection.schema.removeField("4chfz9fv")

  // remove
  collection.schema.removeField("pa8ror1p")

  // remove
  collection.schema.removeField("1abs9pvm")

  // remove
  collection.schema.removeField("hdpluxbx")

  // remove
  collection.schema.removeField("39wzfeuw")

  // remove
  collection.schema.removeField("nyrvbdmw")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
