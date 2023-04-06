import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    constructor() { }

    // menu de etiquetas
    dropdownListTags: any[] = [];
    selectedItemsTags: any[] = [];
    dropdownSettingsTags: IDropdownSettings = {};

    // menu de rango de edad
    dropdownListAge: any[] = [];
    selectedItemsAge: any[] = [];
    dropdownSettingsAge: IDropdownSettings = {};

    ngOnInit() {
        this.dropdownListTags = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' },
            { item_id: 6, item_text: 'Pune' },
            { item_id: 7, item_text: 'Navsari' },
            { item_id: 8, item_text: 'New Delhi' },
            { item_id: 9, item_text: 'Pune' },
            { item_id: 10, item_text: 'Navsari' },
            { item_id: 11, item_text: 'New Delhi' }
        ];
        this.selectedItemsTags = [
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' }
        ];


        this.dropdownSettingsTags = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Seleccionar todas',
            unSelectAllText: 'Deseleccionar todas',
            enableCheckAll: false,
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: 'Buscar',
            noDataAvailablePlaceholderText: 'No hay etiquetas disponibles',
            noFilteredDataAvailablePlaceholderText: 'No hay etiquetas filtradas',
        };

        this.dropdownSettingsAge = {
            singleSelection: true,
            idField: 'item_id',
            textField: 'item_text',
            allowSearchFilter: true,
            searchPlaceholderText: 'Buscar',
            noDataAvailablePlaceholderText: 'No hay edades disponibles',
            noFilteredDataAvailablePlaceholderText: 'No hay edades filtradas',
        };
    }

    onItemSelectTag(item: any) {
        console.log(item);
    }

    onSelectAllTags(items: any) {
        console.log(items);
    }

    onItemSelectAge(item: any) {
        console.log(item);
    }

    onSelectAllAge(items: any) {
        console.log(items);
    }

}
