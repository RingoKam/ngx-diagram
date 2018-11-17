import {Component, ViewChild} from '@angular/core';
import {NgxDiagramComponent} from 'ngx-diagram';


function id() {
    return '' + Math.random().toString(36).substr(2, 9);
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('diagram') diagram: NgxDiagramComponent;
    selection = [];

    nodes = [];
    links = [];

    ngOnInit() {

        for (let i = 0; i < 10; i++) {
            const idl = id();
            this.nodes.push({id: idl});
            this.diagram.addNodeTo({id: idl}, (Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000);

        }
        this.nodes.forEach(source => {
            for (let i = 0; i < 1; i++) {
                const target = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                this.links.push({source: source.id, target: target.id});
            }
        });


        this.diagram.addData([], this.links);
    }

    connected(connection) {
        if (connection.source.id !== connection.target.id) {
            this.diagram.addData([], [{source: connection.source.id, target: connection.target.id}]);
        }
    }

    created(creation) {
        const node = {id: id()};
        this.nodes.push(node);
        this.diagram.addNodeTo({id: node.id}, creation.x, creation.y);
    }

    selected(selection) {
        this.selection = selection;
    }

    deleteSelected() {
        this.nodes = this.nodes.filter(node => !this.selection.find(n => node.id === n.id));
        this.diagram.updateNodes(this.nodes);
    }
}
