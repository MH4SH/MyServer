import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('resetPassword', table => {	
		table.increments('id').primary();
		table.integer('idUser').unsigned().notNullable();
		table.integer('token').notNullable();
		table.integer('code').notNullable();
		
		table.foreign('idUser').references('id').inTable('user');
	});
}


export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTable('resetPassword');
}

