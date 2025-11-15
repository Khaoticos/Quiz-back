import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { BarRepository } from '../../../repositories/bars.repository';
import { BarService } from '../bars.service';
import { CreateBarDto, UpdateBarDto } from '../dtos/bars.dto';


describe('BarService', () => {
  let service: BarService;
  let repository: BarRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarService,
        {
          provide: BarRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BarService>(BarService);
    repository = module.get<BarRepository>(BarRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call repository.create with dto', async () => {
      const dto: CreateBarDto = { name: 'Test Bar' };
      const result = { id: 1, ...dto };

      mockRepository.create.mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all bars', async () => {
      const result = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];

      mockRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return bar when found', async () => {
      const result = { id: 1, name: 'Test' };

      mockRepository.findById.mockResolvedValue(result);

      expect(await service.findById(1)).toEqual(result);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when bar not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById(123)).rejects.toThrow(
        new NotFoundException('Bar with id 123 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update bar when found', async () => {
      const dto: UpdateBarDto = { name: 'Updated' };
      const result = { id: 1, ...dto };

      mockRepository.findById.mockResolvedValue({ id: 1, name: 'Old' });
      mockRepository.update.mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
      expect(repository.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException when bar does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update(999, { name: 'X' })).rejects.toThrow(
        new NotFoundException('Bar with id 999 not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete bar when found', async () => {
      const result = { success: true };

      mockRepository.findById.mockResolvedValue({ id: 1 });
      mockRepository.delete.mockResolvedValue(result);

      expect(await service.delete(1)).toEqual(result);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when bar does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(
        new NotFoundException('Bar with id 999 not found'),
      );
    });
  });
});
