const Block = require('./Block');
const cypptoHash = require ('./crypto-hash');
const { GENESIS_DATA } = require('./config');


describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp,
        hash,
        lastHash,
        data
    });


    it('has a timestamp, lastHash, hash, and data property', () =>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {

        const genesisBlock = Block.genesis();

        

        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toEqual(true);
            
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })


    })

    describe('mineBlock()', () =>{
        const lastBlock = Block.genesis;
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data});

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it(' sets the `lastHash` to be the `hash` of the lastBlock', () =>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () =>{
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates hash based on proper inputs', () => {
            expect(minedBlock.hash).toEqual(cypptoHash(minedBlock.timestamp, lastBlock.hash, data));
        });
    });

});