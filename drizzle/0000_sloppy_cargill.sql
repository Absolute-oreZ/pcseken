CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`image` longtext,
	`price` decimal(10,2),
	`is_featured` boolean DEFAULT false,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `webapp_contents` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`logo_image` longtext,
	`shop_name` varchar(255) NOT NULL,
	`whatsapp_number` varchar(30) NOT NULL,
	`address` text NOT NULL,
	`google_map_url` text,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webapp_contents_id` PRIMARY KEY(`id`)
);
