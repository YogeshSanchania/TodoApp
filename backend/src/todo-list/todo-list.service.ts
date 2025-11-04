import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { NotFoundError } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';

@Injectable()
export class TodoListService {

    constructor(private readonly databaseService: DatabaseService) { }

    async getAllTodoLists(userId: number, status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') {
        if (status) {
            let todoItems = await this.databaseService.todoList.findMany({
                where: { status, userId },
            });

            if(todoItems.length === 0) {
                throw new NotFoundException(`No todo items found with status ${status}`);
            }
            return todoItems;
        }
        return this.databaseService.todoList.findMany({ where: { userId } });
    }

    async getTodoListById(userId:number, id: number) {
        let todoItem = await this.databaseService.todoList.findUnique({
            where: { id:id, userId:userId },
        });
        if(!todoItem) {
            throw new NotFoundException(`Todo item with id ${id} not found`);
        }
        return todoItem;
    }

    async createTodoList(createTodoDto: CreateTodoDto) {
        return await this.databaseService.todoList.create({
            data: createTodoDto
        });
    }

    async updateTodoList(id:number, updateTodoDto: UpdateTodoDto) {
        console.log(updateTodoDto);
        const existing = await this.databaseService.todoList.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`Todo item with id ${id} not found`);
        }
        return await this.databaseService.todoList.update({
            where: { id },
            data: updateTodoDto
        });
    }

    async deleteTodoList(id: number): Promise<boolean> {
        const existing = await this.databaseService.todoList.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`Todo item with id ${id} not found`);
        }
        await this.databaseService.todoList.delete({
            where: { id }
        });
        return true;
    }
}
