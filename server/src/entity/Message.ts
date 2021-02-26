import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,BeforeInsert} from "typeorm";

@Entity('messages')
export default class Message extends BaseEntity {
    constructor( message: Partial<Message>)
    {
        super();
        Object.assign(this,message);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    from: string;

    @Column({nullable: false})
    to: string;

    @Column({nullable: false})
    messageBody: string;

    @Column({nullable: false})
    subject: string;

    @Column()
    createdAt: String;

    @BeforeInsert()
    beforeInsertActions() {
      this.createdAt = new Date().toISOString();
    }
}
