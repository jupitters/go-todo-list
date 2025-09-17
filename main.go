package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"msg": "Ola Fiber!"})
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := Todo{}

		return c.BodyParser(todo)
	})

	log.Fatal(app.Listen(":4000"))
}
