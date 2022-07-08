import Customer from "../entity/customer";
import RepositoryInterface from "../../@share/repository/repository-interface";

export default interface CustomerRepositoryInterface 
extends RepositoryInterface<Customer> { }