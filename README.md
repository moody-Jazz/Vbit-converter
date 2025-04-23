# Vbit converter
[View Online](https://moody-Jazz.github.io/Vbit-converter) 

**A visual tool for 8×8 bitboard configuration and conversion**  
Designed for game developers working with board game engines that uses the concept of [bitboards](https://en.wikipedia.org/wiki/Bitboard) like chess, checkers, othello or other board games.

![Bitboard Visualizer Interface](displayimg.JPG)  
*The interface showing a sample queen attack pattern from center of the board (0x88492A1CF71C2A49) in hexadecimal mode*

## Purpose
This tool provides an intuitive way to:
- Visually configure 8×8 bitboards
- Instantly convert bit patterns to decimal, hexadecimal, and octal values
- Simplify development of board game engines and AI

## Usage

### Desktop Controls
| Action | Effect |
|--------|--------|
| Left-click | Set bit (1) |
| Right-click | Clear bit (0) |
| Left-click + drag | Set multiple bits |
| Right-click + drag | Clear multiple bits |
| Set All/Reset All | Set all the bits to (1/0) |

### Mobile/Touch Devices
- Tap any bit to set (1)
- Use "Reset All" button to clear the board

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
