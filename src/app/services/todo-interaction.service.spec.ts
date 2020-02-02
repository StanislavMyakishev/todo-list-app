import { TestBed } from '@angular/core/testing';

import { TodoInteractionService } from './todo-interaction.service';

describe('TodoInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoInteractionService = TestBed.get(TodoInteractionService);
    expect(service).toBeTruthy();
  });
});
