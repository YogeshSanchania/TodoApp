import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { JwtAuthGuard } from 'src/user/jwt.guard';


@Controller('todo-list')
@UseGuards(JwtAuthGuard)
export class TodoListController {

    constructor(private readonly todoListService: TodoListService) { }

    @Get()
    getAllTodoLists(@Request() req, @Query('status') status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') {
        return this.todoListService.getAllTodoLists(req.user.id, status);
    }

    @Get(':id')
    getTodoListById(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.todoListService.getTodoListById(req.user.id, id);
    }

    @Post()
    createTodoList(@Request() req, @Body(ValidationPipe) todo: CreateTodoDto) {
        todo.userId = req.user.id;
        return this.todoListService.createTodoList(todo);
    }

    @Patch(':id')
    updateTodoList(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) todo: UpdateTodoDto) {
        return this.todoListService.updateTodoList(id, todo);
    }

    @Delete(':id')
    async deleteTodoList(@Param('id', ParseIntPipe) id: number) {
        let result = await this.todoListService.deleteTodoList(id)
        if (result)
            return { message: `Todo list with id ${id} deleted successfully.` };
        
    }

}
