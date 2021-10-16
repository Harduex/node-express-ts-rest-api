import { Model } from "sequelize";

interface ProjectAssignmentAttributes {
  projectId: number;
  userId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssignment extends Model<ProjectAssignmentAttributes> implements ProjectAssignmentAttributes {
    projectId!: number;
    userId!: string;

    static associate(models: any) {

    }
  }
  ProjectAssignment.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Projects",
          key: "id"
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id"
        }
      },
    },
    {
      sequelize,
      modelName: "ProjectAssignment",
    }
  );
  return ProjectAssignment;
};
