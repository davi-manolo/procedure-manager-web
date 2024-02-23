import { Component, OnInit } from '@angular/core';
import { ProcedureService } from "../../services/procedure/procedure.service";
import { Procedure } from "../../models/procedure.model";
import {CurrencyPipe, DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-procedures-table',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './procedures-table.component.html',
  styleUrl: './procedures-table.component.css'
})
export class ProceduresTableComponent implements OnInit {

  protected readonly Math = Math;

  procedureList: Procedure[] = []
  itemsPerPage = 15;
  currentPage = 1;

  constructor(private procedureService: ProcedureService) {}

  ngOnInit(): void {
    this.procedureService.getProceduresByPeriod().subscribe(procedureList =>
      this.procedureList = procedureList
    )
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    const pageCount = Math.ceil(this.procedureList.length / this.itemsPerPage);
    return this.currentPage === pageCount;
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.procedureList.slice(startIndex, endIndex);
  }

}
