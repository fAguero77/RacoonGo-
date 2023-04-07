import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    constructor(public helperService: HelperService) { }

    // menu de etiquetas
    dropdownListTags: any[] = [];
    selectedItemsTags: any[] = [];
    dropdownSettingsTags: IDropdownSettings = {};

    // menu de rango de edad
    dropdownListAge: any[] = [];
    selectedItemsAge: any[] = [];
    dropdownSettingsAge: IDropdownSettings = {};

    ngOnInit() {
        // inicializar menu de etiquetas
        for (let i = 0; i < 10; i++) {
            this.dropdownListTags.push({ item_id: i, item_text: this.helperService.getThemeInfo(i)[0]})
        }
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


        // inicializar menu de rango de edades
        for (let i = 0; i < 5; i++) {
            this.dropdownListAge.push({ item_id: i, item_text: this.helperService.getAgeText(i)})
        }
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
