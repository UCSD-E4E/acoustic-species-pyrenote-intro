"""I deleted all the tables

Revision ID: fb92705caf09
Revises: b12d246b28e4
Create Date: 2022-03-24 02:09:25.794502

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb92705caf09'
down_revision = 'b12d246b28e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.String(length=128), nullable=False),
    sa.Column('filename', sa.String(length=100), nullable=False),
    sa.Column('original_filename', sa.String(length=100), nullable=False),
    sa.Column('is_marked_for_review', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('last_modified', sa.DateTime(), nullable=False),
    sa.Column('sampling_rate', sa.Integer(), nullable=False),
    sa.Column('clip_length', sa.Float(), nullable=False),
    sa.Column('confident_check', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('filename')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=30), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('last_modified', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_role_role'), 'role', ['role'], unique=True)
    op.create_table('segmentation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('data_id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.Float(), nullable=False),
    sa.Column('end_time', sa.Float(), nullable=False),
    sa.Column('max_freq', sa.Float(), nullable=False),
    sa.Column('min_freq', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.String(length=128), nullable=False),
    sa.Column('last_modified_by', sa.JSON(), nullable=True),
    sa.Column('last_modified', sa.DateTime(), nullable=False),
    sa.Column('time_spent', sa.Float(), nullable=False),
    sa.Column('label', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['data_id'], ['data.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=128), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('last_modified', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('annotation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('segmentation_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('last_modified', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['segmentation_id'], ['segmentation.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('annotation')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_table('user')
    op.drop_table('segmentation')
    op.drop_index(op.f('ix_role_role'), table_name='role')
    op.drop_table('role')
    op.drop_table('data')
    # ### end Alembic commands ###
