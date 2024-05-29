class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].distance <= this.heap[index].distance) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChildIndex = this.getLeftChildIndex(index);
            let rightChildIndex = this.getRightChildIndex(index);
            let smallest = index;

            if (leftChildIndex < length && this.heap[leftChildIndex].distance < this.heap[smallest].distance) {
                smallest = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex].distance < this.heap[smallest].distance) {
                smallest = rightChildIndex;
            }
            if (smallest === index) break;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
