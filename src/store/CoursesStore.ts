import { makeAutoObservable } from "mobx";
import { CourseType } from "../types";

class CoursesStore {
  courses: CourseType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCourses(courses: CourseType[]) {
    this.courses = courses;
  }
}

const courseStore = new CoursesStore();
export default courseStore;
