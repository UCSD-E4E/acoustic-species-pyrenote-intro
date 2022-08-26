"""I deleted all the tables

Revision ID: 437ff5c9ce12
Revises: ecf2c7951ea4
Create Date: 2021-12-20 20:28:21.684060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '437ff5c9ce12'
down_revision = 'ecf2c7951ea4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('data', sa.Column('num_reviewed', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('data', 'num_reviewed')
    # ### end Alembic commands ###
