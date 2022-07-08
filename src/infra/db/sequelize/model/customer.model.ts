import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'customers',
    timestamps: false
})
export default class CustomerModel extends Model {
    
    @PrimaryKey
    @Column
    declare id: string;
    @Column
    declare name: string;
    @Column
    declare active: boolean;
    @Column
    declare rewardPoints: number;
    @Column
    declare street: string;
    @Column
    declare number: number;
    @Column
    declare zip: string;
    @Column
    declare city: string;
}