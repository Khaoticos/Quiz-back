import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { BarRepository } from '../bars.repository';

describe('BarRepository', () => {
  let repository: BarRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarRepository,
        {
          provide: PrismaService,
          useValue: {
            bar: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<BarRepository>(BarRepository);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a bar', async () => {
      const dto = { name: 'Test Bar', type: 'Pub' } as any;

      prisma.bar.create.mockResolvedValue({ id: 1, ...dto });

      const result = await repository.create(dto);

      expect(prisma.bar.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('findAll', () => {
    it('should return all bars', async () => {
      const bars = [
        { id: 1, name: 'A', type: 'Pub' },
        { id: 2, name: 'B', type: 'Restaurant' },
      ];

      prisma.bar.findMany.mockResolvedValue(bars);

      const result = await repository.findAll();

      expect(prisma.bar.findMany).toHaveBeenCalled();
      expect(result).toEqual(bars);
    });
  });

  describe('findById', () => {
    it('should return a bar by id', async () => {
      const bar = { id: 1, name: 'A', type: 'Pub', quizes: [] };

      prisma.bar.findUnique.mockResolvedValue(bar);

      const result = await repository.findById(1);

      expect(prisma.bar.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { quizes: true },
      });
      expect(result).toEqual(bar);
    });

    it('should return null if bar not found', async () => {
      prisma.bar.findUnique.mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a bar', async () => {
      const dto = { name: 'Updated' } as any;
      const updatedBar = { id: 1, name: 'Updated' };

      prisma.bar.update.mockResolvedValue(updatedBar);

      const result = await repository.update(1, dto);

      expect(prisma.bar.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result).toEqual(updatedBar);
    });
  });

  describe('delete', () => {
    it('should delete a bar', async () => {
      const deletedBar = { id: 1 };

      prisma.bar.delete.mockResolvedValue(deletedBar);

      const result = await repository.delete(1);

      expect(prisma.bar.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deletedBar);
    });
  });
});
