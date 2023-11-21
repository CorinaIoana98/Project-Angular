import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-myshifts',
  templateUrl: './myshifts.component.html',
  styleUrls: ['./myshifts.component.css'],
})
export class MyshiftsComponent implements OnInit {
  shifts = [];

  displayedColumns = [
    'shiftName',
    'startShift',
    'endShift',
    'wage',
    'place',
    'date',
    'editShift',
    'deleteShift',
  ];
  searchStartDate: Date;
  searchEndDate: Date;
  filteredShifts: any[] = [];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  constructor(
    private authService: AuthService,
    private liveAnnouncer: LiveAnnouncer
  ) {}
  async ngOnInit(): Promise<void> {
    (await this.authService.getEditShifts()).subscribe((data: Array<any>) => {
      this.shifts = data;
      this.filteredShifts = this.shifts;
      this.filteredShifts.forEach((shift) => (shift.isVisible = true));
      this.dataSource = new MatTableDataSource(this.filteredShifts);
      this.dataSource.sort = this.sort;
      console.log(this.shifts);
    });
  
  }
  // async deleteShifts(shift_Name) {
  //   (await this.authService.deleteShifts(shift_Name)).subscribe((data) => {
  //     console.log('shift deleted');
  //     this.shifts = data;
  //   });
  // }

  async deleteShifts(shift_Name) {
    (await this.authService.deleteShifts(shift_Name)).subscribe((data) => {
      if (Array.isArray(data)) {
        console.log('Shift deleted');
        this.shifts = data;
      } else {
        console.error('Invalid data received:', data);
      }
    });
    
    window.location.reload();
  }

  performSearch() {
    this.filteredShifts.forEach((shift) => {
      if (
        new Date(shift.date) >= new Date(this.searchStartDate) &&
        new Date(shift.date) <= new Date(this.searchEndDate)
      ) {
        shift.isVisible = true;
      } else {
        shift.isVisible = false;
      }
    });
  }
  //sort by wage?????
  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
