import React, { useState } from "react";
import useSound from "use-sound";
import beep from './sounds/beep4.mp3'
import './sortingt.css'
const arraySize = 140;

const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds))
}

const SortingTable = () => {

    const [play] = useSound(beep, { volume: 0.15 })
    const [title, setTitle] = useState('Sorting Table')
    const [stick, setStick] = useState([]);
    const [used, setUsed] = useState(true);
    const [sonor, setSonor] = useState(true);

    function resetArray() {
        setTitle('Sorting Table')
        setUsed(false);
        setStick(stick => []);
        for (let i = 0; i < arraySize; i++) {
            setStick(stick => [...stick, randomIntFromInterval(10, 600)])
        }
        console.log(stick);
    }

    const swap = async (poz1, poz2, arr, time) => {
        let aux = arr[poz1];
        arr[poz1] = arr[poz2];
        arr[poz2] = aux;
        setStick([...stick, arr]);

        let bar1 = document.getElementById(poz1).style;
        let bar2 = document.getElementById(poz2).style;
        bar1.backgroundColor = '#DC143C';
        bar2.backgroundColor = '#6A5ACD';
        if (sonor === true) {
            play();

        }
        await sleep(time);
        bar1.backgroundColor = '#FAF8F1';
        bar2.backgroundColor = '#FAF8F1';
    }


    // Selection Sort 

    const selectionSort = async () => {
        let n = stick.length;
        let sortedStick = stick;
        setTitle('Selection sort: O(n^2)')
        for (let i = 0; i < n - 1; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                if (sortedStick[j] < sortedStick[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                swap(i, min, sortedStick, 50);
                await sleep(50);
            }
        }
    }


    //Bubble Sort

    const bubbleSort = async () => {
        let n = stick.length;
        let sortedStick = stick;
        let sorted = false;
        setTitle('Bubble sort: O(n)')
        do {
            sorted = true;
            for (let i = 0; i < n - 1; i++)
                if (sortedStick[i + 1] < sortedStick[i]) {
                    swap(i, i + 1, sortedStick, 25);
                    await sleep(25);
                    sorted = false;
                }
        } while (!sorted);
    }


    //Insertion Sort

    const insertionSort = async () => {
        let n = stick.length;
        let sortedStick = stick;
        setTitle('Insertion sort: O(n)')
        for (let i = 1; i < n; i++) {
            let j = i;
            while (j > 0 && sortedStick[j] < sortedStick[j - 1]) {
                swap(j, j - 1, sortedStick, 25);
                await sleep(25);
                j--;
            }
        }
    }

    //Quick Sort

    function partition(arr, start, end) {
        const pivotValue = arr[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                swap(i, pivotIndex, arr, 125);
                pivotIndex++;
                sleep(125);
            }
            sleep(125)
        }

        swap(pivotIndex, end, arr, 125);
        sleep(125);
        return pivotIndex;
    }

    const doQuick = async (array, st, ed) => {
        if (st >= ed) {
            return;
        }
        let index = await partition(array, st, ed);
        await sleep(125);
        await doQuick(array, st, index - 1);
        await sleep(125);
        await doQuick(array, index + 1, ed);
        await sleep(125);
    }

    const quickSort = async () => {
        let n = stick.length;
        let sortedStick = stick;
        setTitle('Quick sort: O(n log(n))')
        await doQuick(sortedStick, 0, n - 1);
    }

    //Merge Sort

    const merge = async (array, left, mid, right) => {
        let i = left;
        let j = mid + 1;
        let poz = 0;
        let newArr = []

        while (i <= mid && j <= right) {
            if (array[i] < array[j]) {
                newArr[poz++] = array[i++]
            } else {
                newArr[poz++] = array[j++]
            }

            setStick([...stick, newArr]);

            let bar1 = document.getElementById(i).style
            let bar2 = document.getElementById(j).style
            bar1.backgroundColor = '#DC143C'
            bar2.backgroundColor = '#6A5ACD'

            await sleep(25);

            bar1.backgroundColor = '#FAF8F1'
            bar2.backgroundColor = '#FAF8F1'
            if (sonor === true) {
                play();
    
            }
        }

        while (i <= mid) {
            newArr[poz++] = array[i++]

            setStick([...stick, newArr]);

            let bar1 = document.getElementById(i).style
            let bar2 = document.getElementById(j).style
            bar1.backgroundColor = '#DC143C'
            bar2.backgroundColor = '#6A5ACD'

            await sleep(25);

            bar1.backgroundColor = '#FAF8F1'
            bar2.backgroundColor = '#FAF8F1'
            if (sonor === true) {
                play();
    
            }

        }

        while (j <= right) {
            newArr[poz++] = array[j++]

            setStick([...stick, newArr]);

            let bar1 = document.getElementById(i).style
            let bar2 = document.getElementById(j).style
            bar1.backgroundColor = '#DC143C'
            bar2.backgroundColor = '#6A5ACD'

            await sleep(25);

            bar1.backgroundColor = '#FAF8F1'
            bar2.backgroundColor = '#FAF8F1'
            if (sonor === true) {
                play();
    
            }
        }

        for (let i = left; i <= right; i++) {
            array[i] = newArr[i - left]
            if (sonor === true) {
                play();
    
            }
            setStick([...stick, array]);
        }

    }

    const doMerge = async (arr, left, right) => {
        if (left < right) {
            let middle = Math.floor((left + right) / 2)
            await doMerge(arr, left, middle);
            await doMerge(arr, middle + 1, right)
            await merge(arr, left, middle, right)
        }
    }

    const mergeSort = async () => {
        let sortedStick = stick;
        setTitle('Merge sort: O(n log(n))')
        doMerge(sortedStick, 0, sortedStick.length - 1);
    }

    return (
        <div className="table1">
            <h1 className="titleAlg">{title}</h1>
            <div className="container3">
                <div className="something">
                    {stick.map((value, id) => (
                        <div className="stick" key={id} id={id} style={{ height: `${value}px`, }}></div>))}
                </div>
                <div className="buttons">
                    <button onClick={() => { resetArray(); }}><span className="button_top" >Generate New Array</span></button>
                    <button onClick={() => { if (used === false) { setUsed(true); mergeSort(); console.log(stick) } }}><span className="button_top">Merge Sort</span></button>
                    <button onClick={() => { if (used === false) { setUsed(true); bubbleSort() } }}><span className="button_top">Bubble Sort</span></button>
                    <button onClick={() => { if (used === false) { setUsed(true); selectionSort(); console.log(stick) } }}><span className="button_top" >Selection Sort</span></button>
                    <button onClick={() => { if (used === false) { setUsed(true); quickSort(); console.log(stick) } }}><span className="button_top">Quick Sort</span></button>
                    <button onClick={() => { if (used === false) { setUsed(true); insertionSort(); console.log(stick) } }}><span className="button_top">Insertion Sort</span></button>
                    <button onClick={() =>{setSonor(!sonor)}}><span className="button_top">Sound</span></button>
                </div>
            </div>
        </div>

    );
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingTable;