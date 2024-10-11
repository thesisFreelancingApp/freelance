import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient'; // Assurez-vous que ce chemin est correct
import { CategoryHierarchy } from '@prisma/client';



export async function GET() {
  try {
    const categories = await prisma.categoryHierarchy.findMany({
      where: { level: 1 },
      include: {
        children: {
          include: {
            children: true
          }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCategory = await prisma.categoryHierarchy.create({
      data: {
        name: body.name,
        description: body.description,
        level: body.level,
        parent_id: body.parent_id,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedCategory = await prisma.categoryHierarchy.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
        level: body.level,
        parent_id: body.parent_id,
      },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }

  try {
    await prisma.categoryHierarchy.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
  }
}