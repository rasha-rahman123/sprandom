import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';

interface DropdownProps {
    genre: {
        selectedGenre: String[],
        listOfGenresFromAPI: String[]
    }
    changed: any;
    removed: any;
    setGenre: (any) => void;
    options: any[];
    page: number;
    prevPage: () => void;
    nextPage:  () => void;
    setPage: (number) => void;
}

export const Dropdown: NextPage<DropdownProps> = ({genre, changed, removed, setGenre, options, page, prevPage, setPage, nextPage}) => {

    const dropDownChange = (e) => {
       genre.selectedGenre.length < 3 && changed(e);
       !genre.selectedGenre.length < 3 && genre.selectedGenre.includes(genre.listOfGenresFromAPI[e])  && removed(e)
    }

        return (<Box sx={{
            width: '93.5%',
              my: 30, 
              mx: 'auto',
          }}>
            
          <Box sx={{fontSize: ['1.5rem','2rem','2rem'], color: 'orangeText', fontWeight: 400, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontSize: 28
                }}>
                  Genre Selection
                </Box> <Box sx={{
                  fontWeight: 400,
                  width: ['200px','200px','300px'],
                  fontSize: '0.8rem',
                  textAlign: 'right',
                  cursor: "pointer"
                }}>
                 {genre.selectedGenre.length > 0 && <div onClick={() => setGenre({
                   selectedGenre: [],
                   listOfGenresFromAPI: genre.listOfGenresFromAPI
                 })}> Clear Genres <br /></div>}
                  <div sx={{
                   color: '#FFFFFF60',
                   cursor: "none"
                 }}>{'( ' + genre.selectedGenre.map(x => x + " ") + ')'}</div>
                </Box>
              </Box>
           {<Box sx={{
               display: 'grid',
    
               gridTemplateColumns: ['33% 33% 33%','25% 25% 25% 25%','20% 20% 20% 20% 20%'],
               columnGap:10,
               rowGap: 15,
               margin: '0 auto'
           }}>
              {options.filter((q,i) => page === 5 ?  i < 20 * (page + 1) + 6 && i > 20 * (page) : i < 20 * (page + 1) && i > (20 * (page)) - 1 ).map((x, i) => (
                <Box onClick={() => page === 5 ? dropDownChange(i + (20*page) + 1) : dropDownChange(i + (20*page))} key={i} sx={{
                    background: 'darkpurple',
                    color: genre.selectedGenre.length < 3 ? genre.selectedGenre.includes(x) ? '#FB6D3A' : 'yellowText' : genre.selectedGenre.includes(x) ? 'pink' : 'gray',
                    fontWeight: 600,
                    fontSize: ['0.8rem','0.8rem','1rem'],
                    opacity: genre.selectedGenre.includes(x) && genre.selectedGenre.length > 2 ? 1 : genre.selectedGenre.length > 2 ? 0.3 : 1,
                    border: genre.selectedGenre.includes(x) ? genre.selectedGenre.length < 3 ? '3px solid #FB6D3A' : '3px solid pink' : '3px solid transparent',
                    transition: 'all 300ms ease-in-out',
                    userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none',
                    borderRadius: 4,
                    textAlign: 'center',
                    ":hover": {
                        border: genre.selectedGenre.length < 3 ? genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid yellowText' : genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid orangeText',
                        cursor: genre.selectedGenre.length < 3 ? 'pointer' : genre.selectedGenre.includes(x) ? 'pointer' : 'default',
                        color: genre.selectedGenre.includes(x) && 'salmon',
                        background: '#443516'
                    }
                }}>{x}</Box>
              ))}
            </Box>}
                <Box sx={{
                  flexDirection: 'row',
                  display:'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 20,
                  margin: '20px auto',
                  width: '93.5%'
                }}>
               <Box opacity={page === 0 ? 0 : 1} sx={{cursor:'pointer', userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none'}} onClick={() => prevPage()}>
                  {'<'}
                </Box> {[1, 2,3,4,5,6].map((x,i) => <Box key={i} onClick={() => setPage(i)} width={16} height={16} mx={3} p={'15px'} sx={{
                  borderRadius: 8,
                  cursor: 'pointer',
                  backgroundColor: page === i ? 'yellowText' : 'orangeText',
                  ":hover": {
                      bg: 'background'
                  }
                }}></Box>)}   <Box sx={{cursor:'pointer', userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none'}}  opacity={page === 5 ? 0 : 1} onClick={() => nextPage()}>
                  {'>'}
                </Box>
                </Box>
          </Box>);
}