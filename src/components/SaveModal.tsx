import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { getToday, readableSeconds } from "@/utils/saveModalUtils";
import { useWaveformStore } from "@/stores/waveformStore";
import { useMetronomeStore } from "@/stores/metronomeStore";


export default function SaveModal() {
    const date = getToday();
    const {title, loopStart, loopEnd} = useWaveformStore();
    const {bpm} = useMetronomeStore();

    const insts = ['guitar', 'bass', 'drum', 'keyboard', 'vocal', 'etc'];

    return(
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Save</Button>
            </DrawerTrigger>
            <div className="mx-auto w-full max-w-sm">
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>오늘의 연습일지</DrawerTitle>
                        <DrawerDescription>{date}</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex">
                        곡명 (zustand로 불러오기 & 수정 가능)
                        <Label className="text-lg">곡명</Label>
                        <Input defaultValue={title} placeholder="Song name"/>

                        악기 (콤보박스 이용해도 낫배드)
                        <Label className="text-lg">악기</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder='Select a intrument'></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Band</SelectLabel>
                                    {insts.map((inst) => (
                                        <SelectItem value={inst}>{inst}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        파트 (이건 체크박스로 체크하면 시간 기록 or 사용자 인풋)
                        <Label className="text-lg">연습 파트</Label>
                        <Input defaultValue={`${readableSeconds(loopStart)} ~ ${readableSeconds(loopEnd)}`} placeholder="ex) 1절 b파트"/>

                        <Label className="text-lg">연습 BPM</Label>
                        <Input defaultValue={bpm} placeholder="bpm"/>

                        태그 (chips input)

                        <Label className="text-lg">메모</Label>
                        <Textarea placeholder="type practice memo" />
                    </div>
                    <DrawerFooter>
                        <Button>submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </div>
            
        </Drawer>
    );
}