import { Column, PrimaryColumn, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import {  v4 as uuid } from 'uuid';
import { Survey } from './Survey';
import { Users } from './User';

@Entity("surveys_users")
class SurveyUser {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({name: "user_id"})
    user: Users

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { SurveyUser }