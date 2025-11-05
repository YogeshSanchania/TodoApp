import { Test, TestingModule } from '@nestjs/testing';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';

describe('TodoListController', () => {
  let controller: TodoListController;
  let service: TodoListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoListController],
      providers: [
        {
          provide: TodoListService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoListController>(TodoListController);
    service = module.get<TodoListService>(TodoListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
