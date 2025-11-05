import { Test, TestingModule } from '@nestjs/testing';
import { TodoListService } from './todo-list.service';
import { DatabaseService } from 'src/database/database.service';

describe('TodoListService', () => {
  let service: TodoListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoListService,
        {
          provide: DatabaseService,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<TodoListService>(TodoListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
