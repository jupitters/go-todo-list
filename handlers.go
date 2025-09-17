package main

import (
	"context"

	"github.com/gofiber/fiber"
	"go.mongodb.org/mongo-driver/bson"
)

func getTodos(c *fiber.Ctx) error {
	todos := []Todo{}

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		todo := Todo{}
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(todos)
}
