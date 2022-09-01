"""empty message

Revision ID: 1b39d3bf4c5a
Revises: 497f1262236e
Create Date: 2022-08-28 12:19:39.731313

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1b39d3bf4c5a'
down_revision = '497f1262236e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('evento', 'admin',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('evento', 'admin',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###